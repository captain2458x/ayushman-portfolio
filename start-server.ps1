$port = 3000
$path = Get-Item -Path "$PSScriptRoot\dist" | Select-Object -ExpandProperty FullName

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running at http://localhost:$port/" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $requestPath = $request.Url.LocalPath
    if ($requestPath -eq "/") { $requestPath = "/index.html" }
    
    $filePath = Join-Path $path ($requestPath.TrimStart('/').Replace('/', '\'))
    
    # If path doesn't exist and it's an HTML request, serve index.html for SPA routing
    if (-not (Test-Path $filePath) -and $requestPath.EndsWith('.html') -eq $false) {
        $filePath = Join-Path $path "index.html"
    }
    
    if (Test-Path $filePath -PathType Leaf) {
        $file = Get-Item $filePath
        $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $fileBytes.Length
        
        # Set content type
        $ext = $file.Extension.ToLower()
        switch ($ext) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".css" { $response.ContentType = "text/css; charset=utf-8" }
            ".js" { $response.ContentType = "application/javascript; charset=utf-8" }
            ".json" { $response.ContentType = "application/json; charset=utf-8" }
            ".pdf" { $response.ContentType = "application/pdf" }
            ".jpg" { $response.ContentType = "image/jpeg" }
            ".png" { $response.ContentType = "image/png" }
            ".svg" { $response.ContentType = "image/svg+xml" }
            ".dwg" { $response.ContentType = "application/vnd.autodesk.autocad.drawing" }
            ".step" { $response.ContentType = "application/step" }
            default { $response.ContentType = "application/octet-stream" }
        }
        
        $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
    } else {
        $response.StatusCode = 404
        $response.ContentType = "text/plain"
        $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
        $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
    }
    
    $response.Close()
}

$listener.Stop()
