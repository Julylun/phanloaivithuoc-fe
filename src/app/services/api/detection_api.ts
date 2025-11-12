const api = 'http://localhost:8000/detection/'

export const startDetection = async () => {
    await fetch(api + 'start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})});
}

export const stopDetection = async () => {
    await fetch(api + 'stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})}
    );
}
export const exportDetection = () => {

}
export const resetData = () => {

}
