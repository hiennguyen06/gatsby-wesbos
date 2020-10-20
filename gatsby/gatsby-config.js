// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slick's Slices`,
        siteUrl: 'https://gatsby.pizza',
        description: 'the best pizza place in Hamilton!',
        twitter: '@slicksSlices',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            // this is the name of the plugin you are adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'pcuzrsir',
                dataset: 'production',
                watchMode: 'true',
                token: 'skQAfL9ZVAGEOtEYNMWaOGtF1zONBlHCzmG2xUDcY44bVxyVizLJ9aniGhuXEztcU3aWnvyKzOWigUmJMcNVatGzRH45u6gzmnvHErz709HcO8M500BaPDQtr1hZ23y5GHsUrGkXGxo0jbl60zEZYTTwJYD9qzDVa4ab4T4dGTG64W8aJxgi',
            },
        },
    ],
};