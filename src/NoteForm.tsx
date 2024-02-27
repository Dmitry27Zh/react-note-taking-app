import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidv4 } from 'uuid'
import { NoteData, Tag } from './App'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate('..')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label }
                  onAddTag(newTag)
                  setSelectedTags((prevState) => [...prevState, newTag])
                }}
                isMulti
                value={selectedTags?.map((tag) => {
                  return {
                    label: tag.label,
                    value: tag.id,
                  }
                })}
                options={availableTags.map((tag) => {
                  return {
                    label: tag.label,
                    value: tag.id,
                  }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                      }
                    })
                  )
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} as="textarea" rows={15} required />
        </Form.Group>
        <Stack className="justify-content-end" direction="horizontal" gap={2}>
          <Button type="submit" variant="outline-primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm
