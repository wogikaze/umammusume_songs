import { Card, CardContent } from "@/components/ui/card";
import UmaIconList from "./UmaIconList";
import { Songs } from "./songs";

const SongTable = ({ songs }: { songs: Songs }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {songs.map((song) => (
                <Card key={song.songName + song.albumName}>
                    <CardContent className="flex flex-col gap-4 p-4">
                        <div className="text-lg font-semibold">{song.songName}</div>
                        <UmaIconList charactors={song.charactors} />
                        <div>{song.albumName}</div>
                        {/* <YouTubeEmbed videoId={song.youtubeId} /> */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SongTable;
