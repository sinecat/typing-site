export const getRandomData = (dataArr: any[], num: number) => {
    let result = [];
    const shuffled = dataArr.slice().sort(() => 0.5 - Math.random());
    result = shuffled.slice(0, num).map((item) => ({
        text: item.text,
        value: item.value + ' '
    }))

    return {
        data: result,
        targetStr: result.map(item => item.value).join(''),
        strLength: result.reduce((acc, cur) => acc + cur.value.length, 0),
        hotWordsLength: result.reduce((acc, cur) => acc + cur.text.length, 0)
    }
}

export const getRandomDataSentence = (dataArr:string[]) => {
    const randomIndex = Math.floor(Math.random() * dataArr.length);
    const result =  dataArr[randomIndex];
    return {
        data:result,
        length:result.length
    }
}