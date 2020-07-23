import React from 'react'
import { MetaTags } from 'react-meta-tags'
import Title from './Title'
import Description from './Description'
import Keywords from './Keywords'
import Image from './Image'
import Robots from './Robots'
import logo from 'Root/public/favicon.png'

export default props => {
    return (
        <MetaTags>
            {/* General */}
            <title>{Title({ ...props })}</title>
            <meta name='description' content={Description({ ...props })} />
            <meta name='keywords' content={Keywords({ ...props })} />
            <meta name='robots' content={Robots({ ...props })} />
            <link rel='icon' href={logo} />
            {/* Open Graph data */}
            <meta property='og:title' content={Title({ ...props })} />
            <meta property='og:type' content='website' />
            <meta
                property='og:description'
                content={Description({ ...props })}
            />
            <meta property='og:image' content={Image({ ...props })} />
            <meta property='og:url' content={window.location} />
            <meta property='og:site_name' content='Weesh' />
            {/* Twitter */}
            <meta name='twitter:title' content={Title({ ...props })} />
            <meta
                name='twitter:description'
                content={Description({ ...props })}
            />
            <meta name='twitter:image:src' content={Image({ ...props })} />
            <meta name='twitter:card' content='summary' />
        </MetaTags>
    )
}
