const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900 py-12 mt-20">
      <div className="container mx-auto px-4">
        <p className="text-gray-400 mb-6">
          Ada pertanyaan? Hubungi{' '}
          <a href="tel:007-803-321-8275" className="hover:underline">
            007-803-321-8275
          </a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-8">
          <div className="space-y-3">
            <a href="#" className="block hover:underline">
              Tanya Jawab
            </a>
            <a href="#" className="block hover:underline">
              Hubungan Investor
            </a>
            <a href="#" className="block hover:underline">
              Cara Menonton
            </a>
            <a href="#" className="block hover:underline">
              Informasi Perusahaan
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="block hover:underline">
              Pusat Bantuan
            </a>
            <a href="#" className="block hover:underline">
              Lowongan Kerja
            </a>
            <a href="#" className="block hover:underline">
              Ketentuan Penggunaan
            </a>
            <a href="#" className="block hover:underline">
              Hubungi Kami
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="block hover:underline">
              Akun
            </a>
            <a href="#" className="block hover:underline">
              Tukar Kartu Hadiah
            </a>
            <a href="#" className="block hover:underline">
              Privasi
            </a>
            <a href="#" className="block hover:underline">
              Uji Kecepatan
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="block hover:underline">
              Pusat Media
            </a>
            <a href="#" className="block hover:underline">
              Beli Kartu Hadiah
            </a>
            <a href="#" className="block hover:underline">
              Preferensi Cookie
            </a>
            <a href="#" className="block hover:underline">
              Informasi Legal
            </a>
          </div>
        </div>

        <p className="text-gray-500 text-sm">© 2024 DiStreaming Indonesia</p>
      </div>
    </footer>
  );
};

export default Footer;