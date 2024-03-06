import Form from 'react-bootstrap/Form';

function FileUpload() {
  return (
    <>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>파일 업로드</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>

    </>
  );
}

export default FileUpload;
