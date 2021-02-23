import { publicationsMock } from "./mocksAPI";
import { Publication, Responsive } from "./Publication.interface";
export class RestAPI {
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  mocks: boolean = process.env.MOCKS === 'true';
  constructor() {
  }

  private generateRandomDigits(from: number, to: number, arr: number[]): number {
    const n: number = Math.floor(Math.random() * to) + from;
    const contains = (n: number, arr: number[]) => arr.includes(n);
    return contains(n, arr)
      ? this.generateRandomDigits(from, to, arr)
      : n
  }

  async getAPI(url: string, option = { headers: {} }) {
    try {
      const res = await fetch(`${this.proxyUrl}${url}`, {
        ...option,
        /*        mode: 'no-cors', */
        headers: {
          ...option.headers,
          'X-Requested-With': 'wololo',
        },
      });
      const body = await res.json();
      return {
        error: false,
        body
      } as Responsive
    } catch (error) {
      return {
        error: true,
        body: error
      } as Responsive
    }
  }

  async getAllAPI(count: number = 5) {
    const refs: number[] = [];
    const publications: Publication[] = [];
    try {
      /*     console.log(this.mocks, 'mocks'); */

      if (this.mocks) {
        return {
          error: false,
          body: publicationsMock
        }
      } else {
        for (let i = 0; i < count; i++) {
          const ref = this.generateRandomDigits(1, 1000, refs);
          refs.push(ref);
          const { body, error } = await API.getAPI(`https://xkcd.com/${ref}/info.0.json`);
          if (!error) {
            publications.push(body)
          } else {
            const res = await fetch(`https://xkcd.now.sh/?comic=${ref}`);
            const _res = await res.json()
            console.log();
            publications.push(_res)
          }
        }
        return {
          error: false,
          body: publications
        } as Responsive
      }
    } catch (error) {
      return {
        error: true,
        body: error
      } as Responsive
    }
  }
}

const API = new RestAPI();

export default API;