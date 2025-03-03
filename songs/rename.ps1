# ダウンロードした画像が保存されているフォルダのパス
$imageFolder = "../src/assets"

# names.txtファイルのパス
$namesFile = "names.txt"

# links.txtファイルのパス
$urlsFile = "links.txt"

# フォルダが存在しない場合は作成
if (!(Test-Path -Path $imageFolder)) {
    New-Item -ItemType Directory -Path $imageFolder
}

# names.txtから名前を読み込む
$names = Get-Content $namesFile

# paste.txtからURLを読み込む
$urls = Get-Content $urlsFile

# ループ処理でURLをダウンロードして名前を変更
for ($i = 0; $i -lt $urls.Count; $i++) {
    $url = $urls[$i]
    try {
        $uri = New-Object System.Uri($url)
        $fileName = Split-Path $uri.AbsolutePath -Leaf
        $fileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
        $extension = [System.IO.Path]::GetExtension($fileName)

        # ファイル名が *_02_thumb で終わるか確認 (複数回の出現に対応)
        if ($fileNameWithoutExtension -match ".*_02_thumb.*") {
            # names.txt から対応する名前を取得
            $newName = $names[$i] + $extension

            # ファイル名に使用できない文字を削除または置換
            $safeNewName = $newName -replace '[\\/:*?"<>|]', ''

            # ファイル名の長さを制限
            $safeNewName = $safeNewName.Substring(0, [System.Math]::Min($safeNewName.Length, 200)) # 最大200文字

            $outFile = Join-Path $imageFolder $safeNewName

            # ファイルをダウンロード
            Invoke-WebRequest -Uri $url -OutFile $outFile

            Write-Host "Downloaded and Renamed: $($fileName) to $($safeNewName)"
        }
        else {
            Write-Host "Skipped: $($fileName) does not match *_02_thumb pattern"
        }
    }
    catch {
        Write-Host "Error processing URL $($url): $($_.Exception.Message)"
    }
}

Write-Host "Download and Renaming complete."