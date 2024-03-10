import conn from './conn.js'

export async function getAllBlogs() {
    try {
        const [rows] = await conn.query('SELECT * FROM blogs')
        return rows

    } catch (e) {
        console.log(e)
        return e
    }
}

export async function GetPostID(id) {
    try {
        console.log(id)
        const [rows] = await conn.query(`SELECT * FROM blogs WHERE id = ${id}`);
        return rows;
    } catch (e) {
        console.log(e);
        return e;
    }
}


export async function createBlog(title, content) {
    try {
        const [result] = await conn.query(`INSERT INTO blogs (title, content) VALUES ('${title}', '${content}')`)
        return result

    } catch (e) {
        console.log(e)
        return e
    }
}

export async function deleteBlog(id) {
    try {
        const [result] = await conn.query(`DELETE FROM blogs WHERE id = ${id}`)
        return result

    } catch (e) {
        console.log(e)
        return e
    }
}

export async function putpost(id, title, content) {
    try {
        const {rows} = await conn.query(`UPDATE blogs SET title = '${title}', content = '${content}'
        WHERE id = ${id}`)
        return rows

    } catch (e) {
        console.log(e)
        return e
    }
}

