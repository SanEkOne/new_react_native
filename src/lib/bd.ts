import * as SQLite from "expo-sqlite"
import * as Crypto from "expo-crypto"

export interface Product {
    id: string;
    title: string;
    description?: string;
    price: number;
    created_at: number;
    deleted_at?: number;
}

class DatabaseManager {
    private db: SQLite.SQLiteDatabase | null = null

    async init() {
        this.db = await SQLite.openDatabaseAsync("shop.db");

        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS products(
                id CHAR(32) PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                created_at INTEGER DEFAULT (unixepoch()),
                deleted_at INTEGER DEFAULT NULL
            )
        `);
        console.log("DB created succesfully");
    }
    async addProduct(title: string, price: number, description?: string) {
        if (!this.db) throw new Error("DB is not initialazed");
        const result = await this.db.runAsync(
            'INSERT INTO products (id, title, price, description, created_at) VALUES(?,?,?,?,?);',
            [
                Crypto.randomUUID(),
                title,
                price,
                description ? description : null,
                Date.now()
            ]
        );

        return result.lastInsertRowId;
    }

    async getAllProducts(): Promise<Product[]> {
        if (!this.db) throw new Error("DB is not initialized");
        const rows = this.db.getAllAsync<Product>('SELECT * FROM products WHERE deleted_at IS NULL ORDER BY title')
        return rows;
    }

    async deleteProduct(id: string) {
        if (!this.db) throw new Error("DB is not initialized");
        await this.db.runAsync('UPDATE products SET deleted_at = ? WHERE id = ?;', [Date.now(), id]);
    }

    // async updateProduct(id: string, title: string, price: number, description?: string) {
    //     if (!this.db) throw new Error("DB is not initialized");

    //     await this.db.runAsync(
    //         'UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?;',
    //         [
    //             title,
    //             price,
    //             description ? description : null,
    //             id
    //         ]
    //     );
    // }
    async updateProductPartial(
        id: string,
        fields: Partial<Pick<Product, 'title' | 'price' | 'description'>>
    ) {
        if (!this.db) throw new Error("DB is not initialized");

        const keys = Object.keys(fields) as (keyof typeof fields)[];
        if (keys.length === 0) return;

        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = keys.map((key) => fields[key] ?? null);

        await this.db.runAsync(
            `UPDATE products SET ${setClause} WHERE id = ?;`,
            [...values, id]
        );
    }
}

export const dbManager = new DatabaseManager(); 