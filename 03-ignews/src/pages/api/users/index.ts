import { NextApiRequest, NextApiResponse } from "next"

export default function index(request: NextApiRequest, response: NextApiResponse) {
    return response.json([
        { id: 1, name: 'Diego' },
        { id: 2, name: 'Dani' },
        { id: 3, name: 'Rafa' },
    ])
}
