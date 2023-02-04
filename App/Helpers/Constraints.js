// this file use validation.js
// see documentation : https://validatejs.org

const Constraints = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^Nama tidak boleh kosong'
    },
    format: {
      pattern: /^[a-zA-Z\s]+$/,
      message: '^Nama harus berformatkan alphabet'
    }
  },
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^Nama depan tidak boleh kosong'
    },
    format: {
      pattern: /^[a-zA-Z\s]+$/,
      message: '^Nama harus berformatkan alphabet'
    }
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Nama belakang tidak boleh kosong'
    },
    format: {
      pattern: /^[a-zA-Z\s]+$/,
      message: '^Nama harus berformatkan alphabet'
    }
  },
  phone: {
    length: {
      minimum: 9,
      message: '^Nomor handphone harus terdiri dari minimum 9 angka'
    },
    format: {
      pattern: '^[0-9]*$',
      message: '^Format nomor handphone harus angka'
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Email tidak boleh kosong'
    },
    email: {
      message: '^Format email tidak valid'
    }
  },
  maritalStatus: {
    presence: {
      allowEmpty: false,
      message: '^Mohon isi terlebih dahulu untuk menyimpan'
    }
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: '^Mohon isi terlebih dahulu untuk menyimpan'
    }
  },
  address: {
    presence: {
      allowEmpty: false,
      message: '^Mohon isi terlebih dahulu untuk menyimpan'
    }
  },
  addressOptional: {
    length: {
      maximum: 255,
      message: '^Alamat tidak boleh lebih dari 255 karakter'
    }
  },
  domicile: {
    presence: {
      allowEmpty: false,
      message: '^Mohon isi terlebih dahulu untuk menyimpan'
    }
  },
  passwordEs: {
    presence: {
      allowEmpty: false,
      message: '^Kata sandi tidak boleh kosong'
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Kata sandi tidak boleh kosong'
    },
    length: {
      minimum: 8,
      message: '^Kata sandi belum mencapai 8 karakter'
    },
    format: {
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message: '^Kata sandi harus mengandung huruf kapital, angka, dan simbol'
    }
  },
  newPassword: {
    presence: {
      allowEmpty: false,
      message: '^Kata sandi tidak boleh kosong'
    },
    length: {
      minimum: 8,
      message: '^Kata sandi belum mencapai 8 karakter'
    },
    format: {
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message: '^Kata sandi harus mengandung huruf kapital, angka, dan simbol'
    }
  },
  reEnterNewPassword: {
    presence: {
      allowEmpty: false,
      message: '^Kata sandi tidak boleh kosong'
    },
    length: {
      minimum: 8,
      message: '^Kata sandi belum mencapai 8 karakter'
    },
    format: {
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message: '^Kata sandi harus mengandung huruf kapital, angka, dan simbol'
    },
    equality: {
      attribute: 'newPassword',
      message: '^Kata sandi baru tidak sesuai',
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2)
      }
    }
  },
  confirmPassword: {
    equality: {
      attribute: 'password',
      message: '^Kata sandi tidak sesuai',
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2)
      }
    }
  },
  currentPin: {
    presence: {
      allowEmpty: false,
      message: '^PIN Sekarang tidak boleh kosong'
    },
    length: {
      minimum: 6,
      message: '^PIN Sekarang harus terdiri dari 6 digit angka'
    }
  },
  pin: {
    presence: {
      allowEmpty: false,
      message: '^PIN Baru tidak boleh kosong'
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: '^PIN Baru harus terdiri dari 6 digit angka'
    },
    format: {
      pattern: '^[0-9]*$',
      message: '^Format pin harus angka'
    }
  },
  confirmPin: {
    equality: {
      attribute: 'pin',
      message: '^PIN baru tidak sesuai',
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2)
      }
    },
    format: {
      pattern: '^[0-9]*$',
      message: '^Format pin harus angka'
    }
  },
  birthday: {
    presence: {
      allowEmpty: false,
      message: '^Mohon isi terlebih dahulu untuk menyimpan'
    }
  }
}

export default Constraints
