export function load({url}){
  const userId = url.searchParams.get('userId') || '/test';
  return {
    props: {
      userId
    }
  }
}