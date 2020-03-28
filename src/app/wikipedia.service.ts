import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pluck } from "rxjs/operators";

interface WikipediaResponse {
  query: {
    search: {
      pageid: number;
      title: string;
      snipper: string;
    }[];
  };
}

@Injectable({
  providedIn: "root"
})
export class WikipediaService {
  /*https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space */
  constructor(private http: HttpClient) {}

  public search(term: string) {
    return this.http
      .get<WikipediaResponse>("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          format: "json",
          list: "search",
          utf8: "1",
          srsearch: term,
          origin: "*"
        }
      })
      .pipe(pluck("query", "search"));
  }
}
