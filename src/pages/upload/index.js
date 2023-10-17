import React, { useState } from 'react'

const UploadFile = () => {
  /**
   * Coudinary Name => dvvl6xxhm
   * Upload Preset name => l_fondation
   *
   */

  const [file, setFile] = useState([])
  const [fileLink, setFileLink] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileExtension, setFileExtension] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    const fileToUpload = file[0]

    if (fileToUpload.size > 2000000) {
      // 2 Mb
      setError("La taille maximum d'un fichier est de 2 Mb.")

      return
    }

    console.log('File >> ', fileToUpload)
    const formData = new FormData()

    formData.append('file', fileToUpload)
    formData.append('upload_preset', 'l_fondation')

    console.log('formData >> ', formData)

    const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/pribakil/image/upload', {
      method: 'POST',
      body: formData
    })

    const response = await uploadResponse.json()
    setFileLink(response.secure_url)
    setFileName(response.original_filename)
    setFileExtension(response.format)
    setFile([])
    console.log('Upload response >> ', response)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '10px',
          backGroundColor: '#eee',
          maxWidth: '600px'
        }}
        onSubmit={e => handleSubmit(e)}
        
      >
        {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
        <label>Upload File</label>
        <input type='file' onChange={e => setFile([...file, e.target.files[0]])} />
        <button type='submit'>Upload</button>
        <div>
          <div>
            <a href={fileLink} target='_blank' rel='noreferrer'>
              {fileName}
              {`(${fileExtension})`}
            </a>
          </div>

          {/* <img src={fileLink} alt='No file uploaded' style={{ width: '100%' }} /> */}
        </div>
      </form>
    </div>
  )
}

export default UploadFile
