      document.addEventListener('DOMContentLoaded', function() {
          const generateButtons = document.querySelectorAll('.generateButton');
          const originalImages = document.querySelectorAll('.originalImage');

          originalImages.forEach(img => {
              img.crossOrigin = "anonymous";
          });

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

                  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                  ctx.shadowOffsetX = 2;
                  ctx.shadowOffsetY = 2;
                  ctx.shadowBlur = 5;

                  const textWidth = ctx.measureText(watermarkText).width;
                  const textHeight = 30; 
                  const x = (canvas.width - textWidth) / 2;
                  const y = (canvas.height + textHeight) / 2 + 200; 

                  ctx.fillText(watermarkText, x, y);

                  const dataURL = canvas.toDataURL('image/png');

                  const fileName = 'canal10descontos_' + new Date().getTime() + '.png';

                  // cria um botão que executa o download e logo em seguida é removido da tela
                  const link = document.createElement('a');
                  link.href = dataURL;
                  link.download = fileName;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
              });
          });
      });
