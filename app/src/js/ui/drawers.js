import React from "react";
import Interactable from 'react-interactable/noNative'
import styled from '@emotion/styled'

const styles = {
    cover: {
      left: 0,
      right: 0,
      height: 75,
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      width: "100%",
      height: "100%"
    },
    label: {
      textAlign: 'center',
      fontSize: 18
    }
};

const ContainerDrawer = styled.div({
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    width: "80%"
})


class Drawers extends React.Component {

    render () {
        return (
            <ContainerDrawer>
                <Interactable.View
                style={{height: "100%"}}
                    snapPoints={[{x: 0}, {x: -230}]}
                    boundaries={{right: 0}}
                    horizontalOnly={true}>
                    <div style={styles.cover}>
                        <span style={styles.label}>Drawer with limits</span>
                    </div>
                </Interactable.View>
            </ContainerDrawer>
        )
    }
}

export default Drawers