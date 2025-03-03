# テキストファイルからURLを読み込む
$urls = Get-Content "./links.txt"

# ダウンロード先フォルダ
$downloadFolder = "../src/assets"

# フォルダが存在しない場合は作成
if (!(Test-Path -Path $downloadFolder)) {
    New-Item -ItemType Directory -Path $downloadFolder
}

# 各URLをダウンロード
foreach ($url in $urls) {
    try {
        # ファイル名をURLから抽出
        $fileName = Split-Path $url -Leaf

        # ダウンロード先のフルパス
        $filePath = Join-Path $downloadFolder $fileName

        # ファイルをダウンロード
        Invoke-WebRequest -Uri $url -OutFile $filePath

        Write-Host "Downloaded: $fileName"
    }
    catch {
        Write-Host "Error downloading $url : $($_.Exception.Message)"
    }
}

Write-Host "Download complete."
