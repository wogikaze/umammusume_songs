import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export type Character = {
    name: string;
    icon: string;
};

export type FilterMode = "AND" | "OR";

type CharacterFilterProps = {
    characters: Character[];
    onChange: (selected: string[], mode: FilterMode) => void;
};

const CharacterFilter: React.FC<CharacterFilterProps> = ({ characters, onChange }) => {
    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
    const [filterMode, setFilterMode] = useState<FilterMode>("OR");

    const toggleCharacter = (name: string) => {
        let newSelected;
        if (selectedCharacters.includes(name)) {
            newSelected = selectedCharacters.filter((c) => c !== name);
        } else {
            newSelected = [...selectedCharacters, name];
        }
        setSelectedCharacters(newSelected);
        onChange(newSelected, filterMode);
    };

    const handleModeChange = (mode: FilterMode) => {
        setFilterMode(mode);
        onChange(selectedCharacters, mode);
    };

    // アイウエオ順にソート（日本語ロケール）
    const sortedCharacters = [...characters].sort((a, b) =>
        a.name.localeCompare(b.name, "ja")
    );

    return (
        <div>
            {/* AND/OR切替ボタン */}
            <div className="mb-4 flex items-center gap-4">
                <span>検索方法:</span>
                <Button
                    variant={filterMode === "OR" ? "default" : "outline"}
                    onClick={() => handleModeChange("OR")}
                >
                    OR
                </Button>
                <Button
                    variant={filterMode === "AND" ? "default" : "outline"}
                    onClick={() => handleModeChange("AND")}
                >
                    AND
                </Button>
            </div>
            {/* キャラクター一覧 */}
            <div className="flex flex-wrap gap-2 p-2 justify-center">
                {sortedCharacters.map((char) => (
                    <div
                        key={char.name}
                        onClick={() => toggleCharacter(char.name)}
                        className={`flex items-center gap-1 border rounded-2xl cursor-pointer select-none min-w-40 ${selectedCharacters.includes(char.name) ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                    >
                        <img
                            src={char.icon}
                            alt={char.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <span>{char.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterFilter;
