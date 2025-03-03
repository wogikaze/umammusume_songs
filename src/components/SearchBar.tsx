import { Input } from "@/components/ui/input";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    return (
        <div className="mb-4">
            <Input
                type="text"
                placeholder="曲名で検索..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
        </div>
    );
};

export default SearchBar;
