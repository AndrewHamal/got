import React from 'react'

function YoutubeFrame({ width = 560, height = 315, id }: any) {

  // only id
  return (
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  )
}

export default YoutubeFrame