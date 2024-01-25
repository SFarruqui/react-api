import React from 'react';

const Colors = ({data}) => {
    return (
        // React Fragment to group the list of color cards
        <>
          {
            // checks if data exists and then maps over it
            data && data.map((d) => {
               return (
                   // creates a card for each color
                    <div className="card" key={d.id} style={{background: d.color}}>
                        // container for the content inside each card
                        <div className="container">
                            <h4><b>{d.name}</b></h4> // displays the name of the color
                            <p>{d.color}</p> // displays the color value
                        </div>
                    </div>
               )
           })
          }
        </>
    )
}

// exports the Colors component for use in other parts of the app
export default Colors;