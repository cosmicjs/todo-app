export default {
  bucket: {
    slug: process.env.COSMIC_BUCKET || 'todo-app',
    type_slug: 'tasks',
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  }
}