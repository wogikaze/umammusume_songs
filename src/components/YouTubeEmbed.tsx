const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    return (
        <div className="w-full aspect-w-16 aspect-h-9">
            <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default YouTubeEmbed;
