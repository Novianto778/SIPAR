export function formatUang(angka: number) {
  const angka_string = angka.toString();
  var number_string = angka_string.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].slice(0, sisa),
    ribuan = split[0].slice(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return rupiah;
}
