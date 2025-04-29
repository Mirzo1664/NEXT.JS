import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const productData = await request.json();
    const filePath = path.join(process.cwd(), 'app', 'User.json');

    let products = [];
    
    // Читаем существующие данные
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      products = JSON.parse(fileData);
    } catch (error) {
      console.log('Файл не найден, будет создан новый');
    }

    // Добавляем новый продукт
    products.push(productData);

    // Сохраняем обновленные данные
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}