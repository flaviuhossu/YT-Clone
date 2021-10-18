import { Helmet } from 'react-helmet'

const HelmetCustom = (
  title = 'Youtube CLone',
  description = 'a project made with Youtube API and ReactJS'
) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Helmet>
  )
}

export default HelmetCustom
