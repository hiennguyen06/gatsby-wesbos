import { useState, useEffect } from 'react';
const gql = String.raw

const useLatestData = () => {
    // hot slices
    const [hotSlices, setHotSlices] = useState()
    // slicemasters
    const [slicemasters, setSlicemasters] = useState()
    // use a side effect to fetch the data from the graphql endpoint

    useEffect(() => {
        // when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: gql`
                    query {
                        StoreSettings(id: "downtown") {
                            slicemaster {
                                name
                                _id
                                image {
                                  asset {
                                    url
                                    metadata {
                                      lqip
                                    }
                                  }
                                }
                            }
                            hotSlices {
                                name
                                _id
                                image {
                                  asset {
                                    url
                                    metadata {
                                      lqip
                                    }
                                  }
                                }
                            }
                        }
                    }
                `,
            })
        })
            .then((res) => res.json())
            .then((res) => {
            // TODO: Check for errors
            // set the data to state
            setHotSlices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    return {
        hotSlices,
        slicemasters,
    }
}

export default useLatestData;