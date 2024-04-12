document.addEventListener('DOMContentLoaded', function() {
  // Seletores do href da imagem e do botao que gera a imagem nova
  const generateButtons = document.querySelectorAll('.generateButton');
  const originalImages = document.querySelectorAll('.originalImage');
 
  generateButtons.forEach((button, index) => {
       button.addEventListener('click', function() {
           const canvas = document.createElement('canvas');
           canvas.width = originalImages[index].width;
           canvas.height = originalImages[index].height;
 
           const ctx = canvas.getContext('2d');
           ctx.drawImage(originalImages[index], 0, 0, originalImages[index].width, originalImages[index].height);
 
           const watermarkText = new Date().toISOString();
 
           ctx.font = '30px Arial';
           ctx.fillStyle = 'rgba(255, 255, 255)'; 
 
           // Define as propriedades da sombra da hash
           ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Cor da sombra
           ctx.shadowOffsetX = 2; // Deslocamento horizontal da sombra
           ctx.shadowOffsetY = 2; // Deslocamento vertical da sombra
           ctx.shadowBlur = 5; // Efeito de desfoque da sombra
 
           const textWidth = ctx.measureText(watermarkText).width;
           const textHeight = 30; 
           const x = (canvas.width - textWidth) / 2;
          // posição vertical da hash na tela a partir do meio da imagem no caso ele ta 200px para baixo a partir do meio
           const y = (canvas.height + textHeight) / 2 + 200; 
 
           ctx.fillText(watermarkText, x, y);
 
           const dataURL = canvas.toDataURL('image/png');
 
           const fileName = 'canal10descontos_' + new Date().getTime() + '.png';
 
           const link = document.createElement('a');
           link.href = dataURL;
           link.download = fileName;
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
       });
  });
 });
 
