export const styles = {
    listRow: {
        width: '100%',
        maxHeight: '40px',
    },
    completeListRow: {
        width: '100%',
        maxHeight: '40px',
        boxSizing: 'borderBox',
        borderBottom: '4px solid rgba(0, 200, 117, 0.1)',
        // borderRight: '4px solid rgba(0, 200, 117, 0.1)',
        borderLeft: '4px solid rgba(0, 200, 117, 0.3)',
        backgroundColor: 'rgba(0, 200, 117, 0.1)'
    },
    completed: {
        backgroundColor: '#d2f8d2',
        width: '100%'
    },
    activeCell: {
        backgroundColor: '#c4c4c4',
        position: 'relative',
        height: '100%',
        height: '100px',
        padding: '0 8px',
        textAlign: 'left',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    completeCell: {
        backgroundColor: '#d2f8d2',
        backgroundColor: 'rgb(0, 200, 117)',
        position: 'relative',
        height: '100%',
        height: '100px',
        padding: '0 8px',
        textAlign: 'left',
        fontSize: '12px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    }
}