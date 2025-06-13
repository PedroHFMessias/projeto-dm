import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      codigo: 'PROD001',
      descricao: 'Smartphone Samsung Galaxy S24',
      valorNormal: 2999.00,
      valorComDesconto: 2499.00,
      detalhes: 'Smartphone premium com tela de 6.2 polegadas, câmera tripla de 50MP, processador Snapdragon 8 Gen 3, 128GB de armazenamento e 8GB de RAM. Inclui carregador rápido e fones de ouvido.'
    },
    {
      codigo: 'PROD002',
      descricao: 'Notebook Dell Inspiron 15',
      valorNormal: 3499.00,
      valorComDesconto: 2999.00,
      detalhes: 'Notebook com processador Intel Core i5 de 11ª geração, 8GB de RAM, SSD de 256GB, tela Full HD de 15.6 polegadas e Windows 11. Ideal para trabalho e estudos.'
    },
    {
      codigo: 'PROD003',
      descricao: 'Smart TV LG 55" 4K UHD',
      valorNormal: 2199.00,
      valorComDesconto: 1899.00,
      detalhes: 'Smart TV de 55 polegadas com resolução 4K UHD, HDR10, sistema webOS, Wi-Fi integrado, 3 portas HDMI e 2 portas USB. Compatível com Alexa e Google Assistant.'
    },
    {
      codigo: 'PROD004',
      descricao: 'Fone de Ouvido Sony WH-1000XM4',
      valorNormal: 1299.00,
      valorComDesconto: 999.00,
      detalhes: 'Fone de ouvido wireless com cancelamento de ruído ativo, bateria de 30 horas, conectividade Bluetooth 5.0, controles touch e qualidade de áudio Hi-Res.'
    },
    {
      codigo: 'PROD005',
      descricao: 'Tablet Apple iPad Air',
      valorNormal: 4299.00,
      valorComDesconto: 3799.00,
      detalhes: 'iPad Air com tela Liquid Retina de 10.9 polegadas, chip M1, 64GB de armazenamento, Wi-Fi 6, câmera frontal de 12MP com enquadramento automático e compatibilidade com Apple Pencil.'
    },
    {
      codigo: 'PROD006',
      descricao: 'Console PlayStation 5',
      valorNormal: 4999.00,
      valorComDesconto: 4499.00,
      detalhes: 'Console de videogame de nova geração com SSD ultra-rápido, ray tracing, áudio 3D Tempest, controle DualSense com feedback tátil e gatilhos adaptativos. Inclui 1 controle wireless.'
    },
    {
      codigo: 'PROD007',
      descricao: 'MacBook Air M2',
      valorNormal: 8999.00,
      valorComDesconto: 7999.00,
      detalhes: 'MacBook Air com chip M2, tela Liquid Retina de 13.6 polegadas, 8GB de memória unificada, SSD de 256GB, câmera FaceTime HD 1080p e até 18 horas de bateria.'
    },
    {
      codigo: 'PROD008',
      descricao: 'Mouse Gamer Logitech G Pro X',
      valorNormal: 399.00,
      valorComDesconto: 299.00,
      detalhes: 'Mouse gamer sem fio com sensor HERO 25K, switches mecânicos, design ambidestro, bateria de até 70 horas e compatibilidade com PowerPlay.'
    },
    {
      codigo: 'PROD009',
      descricao: 'Teclado Mecânico Corsair K95',
      valorNormal: 899.00,
      valorComDesconto: 699.00,
      detalhes: 'Teclado mecânico gamer com switches Cherry MX, iluminação RGB por tecla, teclas macro dedicadas, descanso para pulso e estrutura em alumínio.'
    },
    {
      codigo: 'PROD010',
      descricao: 'Monitor Gamer ASUS 27" 144Hz',
      valorNormal: 1899.00,
      valorComDesconto: 1599.00,
      detalhes: 'Monitor gamer de 27 polegadas Full HD, taxa de atualização de 144Hz, tempo de resposta de 1ms, tecnologia FreeSync e conectividade HDMI/DisplayPort.'
    },
    {
      codigo: 'PROD011',
      descricao: 'Câmera Canon EOS Rebel T7',
      valorNormal: 2399.00,
      valorComDesconto: 1999.00,
      detalhes: 'Câmera DSLR de 24.1 MP, sensor APS-C CMOS, gravação de vídeo Full HD, Wi-Fi integrado, inclui lente 18-55mm e flash embutido.'
    },
    {
      codigo: 'PROD012',
      descricao: 'Air Fryer Philips Walita 4L',
      valorNormal: 699.00,
      valorComDesconto: 499.00,
      detalhes: 'Fritadeira elétrica sem óleo com capacidade de 4 litros, tecnologia Rapid Air, painel digital touch, timer até 60 minutos e 7 programas pré-definidos.'
    }
  ];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductByCodigo(codigo: string): Product | undefined {
    return this.products.find(product => product.codigo === codigo);
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, product]);
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, product) => total + product.valorComDesconto, 0);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }
}