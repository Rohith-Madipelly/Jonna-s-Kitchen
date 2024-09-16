const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
      let strength = 0;
      if (pass.length >= 6) strength++;
      if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
      if (/\d/.test(pass)) strength++;
      if (/[^a-zA-Z\d]/.test(pass)) strength++;
      return strength;
    };
  
    const strength = getStrength(password);
  
    const getStrengthText = (strength) => {
      if (strength === 0) return 'Very Weak';
      if (strength === 1) return 'Weak';
      if (strength === 2) return 'Fair';
      if (strength === 3) return 'Good';
      return 'Strong';
    };
  
    return (
      <Text>Password strength: {getStrengthText(strength)}</Text>
    );
  };