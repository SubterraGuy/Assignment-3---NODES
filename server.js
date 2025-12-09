const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Load data
const paintings = require("./data/painting.json");
const artists = require("./data/artists.json");
const galleries = require("./data/galleries.json");

// Utility for "Not Found"
function notFound(res) {
    return res.json({ message: "No data found for request." });
}


app.get("/api/paintings", (req, res) => {
    res.json(paintings);
});

app.get("/api/painting/:id", (req, res) => {
    const result = paintings.find(p => p.paintingID == req.params.id);
    if (!result) return notFound(res);
    res.json(result);
});

app.get("/api/painting/gallery/:id", (req, res) => {
    const result = paintings.filter(p => p.gallery.galleryID == req.params.id);
    if (!result.length) return notFound(res);
    res.json(result);
});

app.get("/api/paintings-nested/artist/:id", (req, res) => {
    const result = paintings.filter(p => p.artist.artistID == req.params.id);
    if (!result.length) return notFound(res);
    res.json(result);
});

app.get("/api/painting/year/:min/:max", (req, res) => {
    const min = Number(req.params.min);
    const max = Number(req.params.max);

    const result = paintings.filter(
        p => p.yearOfWork >= min && p.yearOfWork <= max
    );

    if (!result.length) return notFound(res);
    res.json(result);
});

app.get("/api/painting/title/:text", (req, res) => {
    const text = req.params.text.toLowerCase();
    const result = paintings.filter(p => 
        p.title.toLowerCase().includes(text)
    );
    if (!result.length) return notFound(res);
    res.json(result);
});

app.get("/api/painting/color/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const result = paintings.filter(p =>
        p.dominantColors.some(c => c.name.toLowerCase() === name)
    );
    if (!result.length) return notFound(res);
    res.json(result);
});


app.get("/api/artists", (req, res) => {
    res.json(artists);
});

app.get("/api/artists/:country", (req, res) => {
    const country = req.params.country.toLowerCase();
    const result = artists.filter(a => 
        a.Nationality.toLowerCase() === country
    );
    if (!result.length) return notFound(res);
    res.json(result);
});



app.get("/api/galleries", (req, res) => {
    res.json(galleries);
});

app.get("/api/galleries/:country", (req, res) => {
    const country = req.params.country.toLowerCase();
    const result = galleries.filter(g => 
        g.GalleryCountry.toLowerCase() === country
    );
    if (!result.length) return notFound(res);
    res.json(result);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
