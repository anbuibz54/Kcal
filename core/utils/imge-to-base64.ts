export async function convertImageToBase64(image:Blob){
    const base64EncodedDataPromise = new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(image);
      });
    const res = await base64EncodedDataPromise;
      return res;
}