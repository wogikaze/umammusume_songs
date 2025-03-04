import { Card, CardContent } from "@/components/ui/card";
import { Songs } from "./songs";
import UmaIconList from "./UmaIconList";
import YouTubeEmbed from "./YouTubeEmbed";

const SongTable = ({ songs }: { songs: Songs }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
            {songs.map((song) => (
                <Card key={song.songName + song.albumName}>
                    <CardContent className="flex flex-col gap-4 p-4">
                        <div>
                            <a className="text-lg font-semibold text-blue-700" href={`https://www.youtube.com/watch?v=${song.youtubeId}&list=PLXQE_C7He7f9MKGP11OpI8jw187fOgg_3`}>{song.songName}</a>
                        </div>
                        <UmaIconList charactors={song.charactors} />
                        <div>{song.albumName}</div>
                        <YouTubeEmbed videoId={song.youtubeId} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SongTable;
