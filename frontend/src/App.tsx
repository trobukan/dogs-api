import { useEffect, useState } from "react";
import { GetBreedList, GetImageUrlsByBreed, GetRandomImageUrl } from "../wailsjs/go/main/App";
import "./App.css";

function App() {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);

    const [randomImageUrl, setRandomImageUrl] = useState("");
    const [selectedBreed, setSelectedBreed] = useState("");
    const [showRandomPhoto, setShowRandomPhoto] = useState(false);
    const [showBreedPhotos, setShowBreedPhotos] = useState(false);

    useEffect(() => {
        async function getInitialBreedList() {
            const result = await GetBreedList();
            setBreeds(result);
        };
        getInitialBreedList();
    }, [])

    async function getRandomImageUrl() {
        setShowRandomPhoto(false);
        setShowBreedPhotos(false);

        const result = await GetRandomImageUrl();
        setRandomImageUrl(result);
        setShowRandomPhoto(true);
    }

    async function getImageUrlsByBreed() {
        setShowRandomPhoto(false);
        setShowBreedPhotos(false);

        const result = await GetImageUrlsByBreed(selectedBreed)
        setPhotos(result)
        setShowBreedPhotos(true);
    }
    return (
        <>
            <h3>Dogs API</h3>
            <div>
                <button className="btn" onClick={getRandomImageUrl}>
                    Fetch a dog randomly
                </button>
                <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
                <button className="btn" onClick={getImageUrlsByBreed}>
                    Fetch by this breed
                </button>
            </div>
            <br />
            {showRandomPhoto && (
                <img id="random-photo" src={randomImageUrl} alt="No dog found" />
            )}
            {showBreedPhotos && (
                <>
                    {photos.map((photo) => (
                        <img id="breed-photos" key={photo} src={photo} alt="No dog found" />
                    ))}
                </>
            )}
        </>
    );
}

export default App;