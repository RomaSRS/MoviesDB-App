export default class Api {
  apiBase = `https://api.themoviedb.org/3/`;

  apiKey = `d618f5c9c3b3799c4af81efa9e523997`;

  apiPostersUrlBase = `https://image.tmdb.org/t/p/w500`;

  constructor() {
    this.sessionId = null;
    this.createSession();
  }

  createSession = async () => {
    const res = await this.getResource(`authentication/guest_session/new?api_key=${this.apiKey}`);
    this.sessionId = res.guest_session_id;
  };

  getResource = async url => {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`could not fetch`);
    }
    return res.json();
  };

  searchMovies = async (keyword, page) => {
    const res = await this.getResource(
      `search/movie?api_key=${this.apiKey}&query=${keyword}&language=en-US&page=${page}&include_adult=true`,
    );
    return res;
  };

  getRatedMovies = async () => {
    const res = await this.getResource(
      `guest_session/${this.sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.desc`,
    );
    return res;
  };

  getGenres = async () => {
    const res = await this.getResource(`genre/movie/list?api_key=${this.apiKey}&language=en-US`);
    return res;
  };

  rateMovie = async (id, rating) => {
    const requestBody = {
      value: rating,
    };

    await fetch(`${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestBody),
    });
  };
}
