const UmaIconList = ({ charactors }: { charactors: string[] }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {charactors.map((charactorName) => (
                <img
                    key={charactorName}
                    src={`img/${charactorName}.png`}
                    alt={charactorName}
                    title={charactorName}
                    className="w-8 h-8 rounded-full"
                />
            ))}
        </div>
    );
};

export default UmaIconList;
