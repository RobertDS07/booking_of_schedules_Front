export const CatchInputsData = (e) => {
    const formTarget = e.target

    const data = {}

    for (let i = 0; i < formTarget.children.length; i++) {
        if (formTarget.children[i].name !== '') {
            data[formTarget.children[i].name] = formTarget.children[i].value
        }
    }

    return data
}