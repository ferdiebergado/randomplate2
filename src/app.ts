const btnGenerate = document.getElementById(
  'generate',
) as HTMLButtonElement | null;
const selRegion = document.getElementById('region') as HTMLSelectElement | null;
const hDriver = document.getElementById('driver') as HTMLHeadingElement | null;
const hPlate = document.getElementById('plate') as HTMLHeadingElement | null;

if (!btnGenerate || !selRegion || !hDriver || !hPlate) {
  throw new Error('Missing html elements');
}

let isLoading = false;

function toggleSpinner(el: HTMLElement, val: string) {
  const LOADING_CLASS = 'aria-busy';

  if (isLoading) {
    el.setAttribute(LOADING_CLASS, 'true');
  } else {
    el.removeAttribute(LOADING_CLASS);
  }

  el.textContent = val;
}

async function generate(event?: Event) {
  event?.preventDefault();

  if (btnGenerate && selRegion && hDriver && hPlate) {
    isLoading = true;

    toggleSpinner(btnGenerate, 'Generating...');
    const selectedRegion = selRegion.value;
    const formData = new URLSearchParams();
    formData.append('region', selectedRegion);

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: formData,
    });

    const { driver, plate } = await res.json();

    hDriver.textContent = driver;
    hPlate.textContent = plate;

    isLoading = false;
    toggleSpinner(btnGenerate, 'Generate');
  }
}

btnGenerate.addEventListener('click', generate);
selRegion.addEventListener('change', generate);

toggleSpinner(btnGenerate, 'Generate');

generate();
