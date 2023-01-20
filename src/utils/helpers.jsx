export const formatPrice = (val) =>{
    const countNumber = Intl.NumberFormat('en-Us',{
        style:'currency',
        currency:'INR'
    }).format(val/80);

    return countNumber
}

export const getUniqValue = (data,type) =>{
  let unique= data.map((val) => val[type])
  if(type === 'colors'){
      unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}