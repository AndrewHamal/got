import React from 'react'

function YoutubeFrame({ width = 560, height = 315, id }: any) {

  // const newLink = link.replace()

  // return (
  //   <div dangerouslySetInnerHTML={{ __html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DVQ3-Xe_suY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
  // )

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