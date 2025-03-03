import { useEffect, useState } from "react";
import CharacterFilter, { Character, FilterMode } from "./components/CharacterFilter";
import Pagination from "./components/Pagenation";
import SearchBar from "./components/SearchBar";
import SongTable from "./components/SongTable";

export type Song = {
    songName: string;
    albumName: string;
    charactors: string[]; // 歌唱キャラクターの名前一覧
    youtubeId: string;
};

export type Songs = Song[];

function App() {
    const [songs, setSongs] = useState<Songs>([]);
    const [filteredSongs, setFilteredSongs] = useState<Songs>([]);
    const [query, setQuery] = useState("");
    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
    const [filterMode, setFilterMode] = useState<FilterMode>("OR");
    const [characters, setCharacters] = useState<Character[]>([]);

    // ページネーション用の状態
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // データの取得→整理
    useEffect(() => {
        // data.json からデータを取得
        fetch("songs.json")
            .then((res) => res.json())
            .then((data: Songs) => {
                setSongs(data);
                setFilteredSongs(data);
                // 各楽曲に含まれるキャラクター名から一意な一覧を生成
                const charMap: { [key: string]: string } = {};
                data.forEach((song) => {
                    song.charactors.forEach((name) => {
                        // ここでは仮に icon の URL を生成（実際は適切な URL を設定してください）
                        if (!charMap[name]) {
                            charMap[name] = `img/${name}.png`;
                        }
                    });
                });
                const charArray: Character[] = Object.entries(charMap).map(
                    ([name, icon]) => ({ name, icon })
                );
                setCharacters(charArray);
            });
    }, []);

    // 曲名とキャラクター選択状態、AND/OR モードによるフィルター処理
    useEffect(() => {
        let filtered = songs.filter((song) =>
            song.songName.toLowerCase().includes(query.toLowerCase())
        );

        if (selectedCharacters.length > 0) {
            filtered = filtered.filter((song) => {
                // song.charactors はキャラクター名の配列
                if (filterMode === "OR") {
                    // OR: 選択したキャラクターのうち、1人でも含まれていればOK
                    return selectedCharacters.some((char) =>
                        song.charactors.includes(char)
                    );
                } else {
                    // AND: 選択した全てのキャラクターが含まれている場合のみOK
                    return selectedCharacters.every((char) =>
                        song.charactors.includes(char)
                    );
                }
            });
        }
        setFilteredSongs(filtered);
    }, [query, songs, selectedCharacters, filterMode]);

    // ページネーションの計算
    const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
    const paginatedSongs = filteredSongs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCharacterFilterChange = (selected: string[], mode: FilterMode) => {
        setSelectedCharacters(selected);
        setFilterMode(mode);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">ウマ娘 楽曲検索</h1>
            <SearchBar onSearch={setQuery} />
            <CharacterFilter
                characters={characters}
                onChange={handleCharacterFilterChange}
            />
            <SongTable songs={paginatedSongs} />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default App;
