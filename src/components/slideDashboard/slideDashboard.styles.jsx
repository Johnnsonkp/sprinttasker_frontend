import banner from '../../std-banner.svg';
export const styles = {
    container: {
        marginTop: '0px',
        marginBottom: '0px',
        background: "#f0f2f5",
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        paddingTop: '0px',
        paddingLeft: '10px',
        paddingRight: '10px',
        background: '#fff',
        width: '100%',
        margin: 'auto',
        marginRight: '10px',
        marginLeft: '10px',
        border: '1px solid lightgrey',
        borderRadius: '10px',
        minWidth: '1050px',
        minHeight: '310px'
    },
    header: {
        width: '100%',
        margin: 'auto',
        paddingLeft: '60px',
        paddingRight: '60px',
        marginRight: '10px',
        marginLeft: '10px',
        minWidth: '1050px',
        border: '1px solid red'
    },
    innerCard: {
        paddingTop: '0px',
        margin: '0px',
        display: 'flex',
        width: '100%',
        margin: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundSize: 'center center',
        cursor: 'pointer'
    },
    card: {
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 6px 12px 0px',
        cursor: 'pointer',
    }
}