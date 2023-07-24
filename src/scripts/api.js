const url = 'https://genius-song-lyrics1.p.rapidapi.com/search/?q=%3CREQUIRED%3E&per_page=10&page=1';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4txFse78cC7SvfRDsNg0K-w6XUXqfZjHwj-9f2oSz8ayAFXTWTClWjmEs3BkMY4ycVt4Gm5CizigYQj0IMcGrw',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}