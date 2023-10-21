# Start command
$startCommand = "npm run start"

# Current folder
$currentPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Output "Project location : $currentPath"

# Paths for services
$msAuthPath = Join-Path $currentPath "packages\ms-auth"
$msApiGatewayPath = Join-Path $currentPath "packages\ms-api-gateway"
$msUsersPath = Join-Path $currentPath "packages\ms-users"
$msKitchensPath = Join-Path $currentPath "packages\ms-kitchens"
$msOrdersPath = Join-Path $currentPath "packages\ms-orders"
$msCatalogPath = Join-Path $currentPath "packages\ms-catalog"

# Start services in new console windows
Start-Process -FilePath "powershell" -ArgumentList "Set-Location -Path '$msAuthPath'; $startCommand"
Start-Process -FilePath "powershell" -ArgumentList "Set-Location -Path '$msApiGatewayPath'; $startCommand"
Start-Process -FilePath "powershell" -ArgumentList "Set-Location -Path '$msUsersPath'; $startCommand"
Start-Process -FilePath "powershell" -ArgumentList "Set-Location -Path '$msKitchensPath'; $startCommand"
Start-Process -FilePath "powershell" -ArgumentList "Set-Location -Path '$msOrdersPath'; $startCommand"
Start-Process -FilePath "powershell" -ArgumentList "Set-Location -Path '$msCatalogPath'; $startCommand"
