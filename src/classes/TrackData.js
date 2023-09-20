class TrackData {
    constructor(uri, title, description, author, album, cover="") {
        this._uri = uri;
        this._title = title;
        this._description = description;
        this._author = author;
        this._album = album;
        this._cover = cover;
    }

    static compare(a, b) {
        // URI is unique, so this is a fast compare.
        return a.uri === b.uri; 
    }

    get uri() { return this._uri }
    get title() { return this._title }
    get description() { return this._description }
    get author() { return this._author }
    get album() { return this._album }
    get cover() {
        if (this._cover.length > 0) return this._cover;
        else return false;
    }
}

export default TrackData;