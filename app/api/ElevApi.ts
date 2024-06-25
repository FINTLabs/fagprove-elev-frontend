import process from "process";

class ElevApi {
    private readonly baseUrl: string;
    private readonly cookies: string | null;
    private readonly bearerToken: string | undefined;

    constructor(cookies: string | null) {
        this.baseUrl = process.env.BASE_URL || "http://localhost:8080";
        this.cookies = cookies;
        this.bearerToken = process.env.BEARER_TOKEN;
    }

    private getHeaders() {
        return {
            "Content-Type": "application/json",
            "cookie": this.cookies ?? "",
            "Authorization": `Bearer ${this.bearerToken}`,
        };
    }

    async getElevs() {
        const response = await fetch(`${this.baseUrl}/api/elev`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    async addElev(newElev: any) {
        const response = await fetch(`${this.baseUrl}/api/elev`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: this.getHeaders(),
            body: JSON.stringify(newElev),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    async updateElev(updatedElev: any) {
        const response = await fetch(`${this.baseUrl}/api/elev/${updatedElev.id}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: this.getHeaders(),
            body: JSON.stringify(updatedElev)
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    async deleteAllElevs() {
        const response = await fetch(`${this.baseUrl}/api/elev`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    async deleteById(id) {
        const response = await fetch(`${this.baseUrl}/api/elev/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}

export default ElevApi;
