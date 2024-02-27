import { Note } from './App'

type SimplifiedNote = Pick<Note, 'id' | 'title' | 'tags'>

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return <p>Card</p>
}

export default NoteCard
